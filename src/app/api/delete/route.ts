import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request) {
  try {
    const {key, slug} = await req.json()

    if (!slug || !key) return new Response(JSON.stringify({error: 'Missing required parameters'}), {
        status: 400
      })
    
    const file = await prisma.file.findFirst({where: {id: parseInt(slug), AND: [
            {
              adminKey: {
                equals: key
              }
            }
          ]
        }
      }
    )
    
    if (!file) return new Response(JSON.stringify({error: 'Failed to find file or key'}), {
      status: 400
    })
    
    await prisma.file.delete({where: {id: parseInt(slug), AND: [
          {
            adminKey: {
              equals: key
            }
          }
        ]
      }
    })

    if (!file) return new Response(JSON.stringify({error: 'Failed to delete'}), {
      status: 400
    })

    return new Response(JSON.stringify({success: true}))

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: 'Internal server error'}), {
      status: 500,
    })
  }
}