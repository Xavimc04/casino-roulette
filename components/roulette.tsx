import { RouletteContext } from "@/lib/context/roulette.context";
import { RouletteContextProps } from "@/types/casino/types"; 
import { useContext, useEffect, useRef } from "react";


export default function Roulette() {
    const { state, dispatch } : RouletteContextProps = useContext(RouletteContext)
    const historyRef = useRef<HTMLDivElement>(null)

    const numbers = 37; 

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTo({
                left: historyRef.current.scrollWidth,
                behavior: 'smooth'
            })
        }
    }, [state.history])

    return <>
        <div ref={ historyRef } className="flex overflow-x-scroll gap-4 border-b pb-4 border-b-slate-900">
            {
                state.history.length > 0 ? state.history?.map((result: number, i: number) => {
                    return <div 
                        key={ i } 
                        className={
                            `w-[35px] px-4 h-[35px] text-xs flex select-none cursor-pointer hover:scale-90 hover:opacity-70 transition-all items-center justify-center rounded-md ${
                                result === 0
                                ? 'bg-green-500'
                                : result % 2 === 0
                                ? 'bg-red-500'
                                : 'bg-slate-900 text-white'
                            }`
                        }
                    > 
                        <span>{ result }</span>
                    </div>
                }) : <span className="text-gray-600 text-xs">
                    No history yet
                </span>
            }
        </div>

        <div className="flex gap-4 mt-4">
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                {
                    [...Array(numbers)].map((_, i) => {
                        return <div 
                            key={ i } 
                            className={`${
                                i === 0 ? 'row-span-3' : `col-span-2 h-[60px]`
                            } w-[60px] ${
                                i === 0
                                ? 'bg-green-500'
                                : i % 2 === 0
                                ? 'bg-red-500'
                                : 'bg-slate-900 text-white'
                            } flex items-center relative justify-center rounded-md hover:scale-90 hover:opacity-70 transition-all cursor-pointer select-none`}

                            onClick={() => dispatch({
                                type: "ADD_BET", 
                                payload: {
                                    index: 'number-' + i, 
                                    value: state.betAmount
                                }
                            })}
                        >
                            {
                                state.bet[`number-${i}` as keyof typeof state.bet] && <p className="absolute text-xs top-[-5px] right-[-5px] bg-yellow-800 border border-yellow-500 text-yellow-500 rounded-full w-[25px] h-[25px] text-center flex items-center justify-center">
                                    { state.bet[`number-${i}` as keyof typeof state.bet] }
                                </p>
                            }

                            <span>{ i }</span>
                        </div>
                    })
                }
            </div>

            <section className="flex-1 flex flex-col gap-4">
                <BetOption
                    content="1st ROW" 
                    betIndex="row-1"
                />

                <BetOption
                    content="2nd ROW" 
                    betIndex="row-2"
                />

                <BetOption
                    content="3rd ROW" 
                    betIndex="row-3"
                /> 
            </section>
        </div>
        
        <div className="flex gap-4 mt-4">
            <BetOption
                content="1-12"
                betIndex="section-1"
            />

            <BetOption
                content="13-24"
                betIndex="section-2"
            />

            <BetOption
                content="25-36"
                betIndex="section-3"
            />
        </div>

        <div className="flex gap-4 mt-4">
            <BetOption
                content="1-18"
                betIndex="half-1"
            />

            <BetOption
                content="EVEN"
                betIndex="even"
            />

            <BetOption
                content=""
                background="bg-red-500"
                betIndex="color-red"
            />

            <BetOption
                content=""
                background="bg-slate-900"
                betIndex="color-black"
            />

            <BetOption
                content="ODD"
                betIndex="odd"
            />

            <BetOption
                content="19-36"
                betIndex="half-2"
            />
        </div>
    </>
}

function BetOption({
    content,
    background,
    betIndex
}: {
    content: string,
    background?: string,
    betIndex: string
}): JSX.Element {
    const { state, dispatch } : RouletteContextProps = useContext(RouletteContext)

    return <div  
        className={ `h-[60px] w-full flex items-center relative cursor-pointer select-none justify-center rounded-md ${ background ? background : 'bg-slate-800' } hover:scale-90 hover:opacity-70 transition-all` }
        onClick={() => dispatch({
            type: "ADD_BET", 
            payload: {
                index: betIndex, 
                value: 1
            }
        })}
    >
        {
            state.bet[betIndex as keyof typeof state.bet] && <p className="absolute text-xs top-[-5px] right-[-5px] bg-yellow-800 border border-yellow-500 text-yellow-500 rounded-full w-[25px] h-[25px] text-center flex items-center justify-center">
                { state.bet[betIndex as keyof typeof state.bet] }
            </p>
        }

        <span>{ content }</span>
    </div>
}